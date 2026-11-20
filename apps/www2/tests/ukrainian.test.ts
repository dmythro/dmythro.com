import { describe, expect, it } from 'bun:test'
import { join } from 'node:path'
import { Glob } from 'bun'

/**
 * Ukrainian copy must not carry Russian words, or the Russian turns of phrase that
 * have slipped into it before. Passing does not make a text good Ukrainian; it only
 * keeps the known mistakes from coming back.
 */

const root = join(import.meta.dir, '../../..')

/** Every place Ukrainian copy lives. In the app's own sources all Cyrillic is Ukrainian. */
const sources: [dir: string, pattern: string][] = [
  ['packages/locales/mdx', '**/*.uk.mdx'],
  ['packages/locales/src/uk', '**/*.ts'],
  ['apps/www2/src', '**/*.{ts,astro}'],
]

/** Letters the Ukrainian alphabet does not have. */
const russianLetters = /[ыэъё]/i

/** Russian words that Ukrainian letters can spell. */
const russianWords = new Set(
  `и но да ни ли из как или что это если когда только тоже также очень есть нет еще где здесь
  сейчас потом после между можно нужно надо потому тогда всегда никогда хорошо плохо сразу теперь
  конечно например его они она оно меня тебя себя такой какой другой свой мой твой работа работает
  сделать использовать страница приложение настройки ошибка ссылка пользователь`.split(/\s+/),
)

const letter = "а-яіїєґ'’ʼ"
const phrase = (source: string) => new RegExp(`(?<![${letter}])(?:${source})(?![${letter}])`, 'i')

/** Russian turns of phrase written with Ukrainian words, and what to write instead. */
const calques: [pattern: RegExp, instead: string][] = [
  [/задач/i, 'завдання'],
  [/напряму/i, 'безпосередньо, прямо'],
  [/підписк/i, 'передплата, абонемент'],
  [/слідку/i, 'стежити'],
  [/слідуюч/i, 'наступний'],
  [phrase('являється|являє собою'), 'є'],
  [/скача/i, 'завантажити'],
  [/папк/i, 'тека'],
  [/замовчуванн/i, 'типово'],
  [/хоббі/i, 'хобі'],
  [/просунут/i, 'поглиблений, досвідчений'],
  [/нержавіюч/i, 'нержавний'],
  [/жорстко зашит/i, 'жорстко вбудований'],
  [phrase('відправн[а-яіїє]* точ[а-яіїє]*'), 'за основу'],
  [/машиночитн/i, 'машинозчитуваний'],
  [phrase('мітинг[а-яіїє]*'), 'зустріч'],
  [phrase('будучи'), 'ще студентом, як'],
  [phrase('на той момент'), 'тоді'],
  [phrase('випадн[а-яіїє]* спис[а-яіїє]*'), 'розкривний список'],
  [phrase('пару (?:років|місяців|тижнів|днів|годин|хвилин|разів)'), 'кілька'],
  [phrase('додат(?:ок|ку|ком|ки|ків|ках)'), 'застосунок'],
  [phrase('дан(?:ий|ого|ому|ої|у|е)'), 'цей'],
  [phrase('вихідн(?:ий|ого|ому|им|і|их|ими) (?:код|файл|дан)[а-яіїє]*'), 'початковий'],
  [phrase('в основному'), 'здебільшого, переважно'],
  [phrase('[ув] залежності від'), 'залежно від'],
  [phrase('з точки зору'), 'з погляду'],
  [phrase('виключно'), 'лише, винятково'],
  [phrase('при цьому'), 'водночас'],
  [phrase('на базі'), 'на основі'],
  [phrase('більш ніж'), 'понад'],
  [phrase('на протязі'), 'протягом'],
  [phrase('[ув] якості'), 'як'],
  [phrase('прийма[а-яіїє]* участь'), 'брати участь'],
  [phrase('так як'), 'оскільки, бо'],
  [phrase('не дивлячись на'), 'попри'],
]

const files: { name: string; text: string }[] = []
for (const [dir, pattern] of sources) {
  for await (const path of new Glob(pattern).scan(join(root, dir))) {
    files.push({ name: `${dir}/${path}`, text: await Bun.file(join(root, dir, path)).text() })
  }
}

describe('Ukrainian copy', () => {
  // Every check below asserts "nothing found", which an empty list would satisfy.
  it('has files to check', () => {
    expect(files.length).toBeGreaterThan(20)
    expect(files.some(({ text }) => /[іїєґ]/i.test(text))).toBe(true)
  })

  it('has no letters from the Russian alphabet', () => {
    const found = files.filter(({ text }) => russianLetters.test(text)).map(({ name }) => name)
    expect(found).toEqual([])
  })

  it('has no Russian words', () => {
    const found = files.flatMap(({ name, text }) =>
      (text.toLowerCase().match(/[а-яіїєґ]+(?:['’ʼ][а-яіїєґ]+)*/g) ?? [])
        .filter((word) => russianWords.has(word))
        .map((word) => `${name}: ${word}`),
    )
    expect(found).toEqual([])
  })

  it('has no Russian turns of phrase', () => {
    const found = files.flatMap(({ name, text }) =>
      calques.flatMap(([pattern, instead]) => {
        const match = text.match(pattern)
        return match ? [`${name}: «${match[0]}» → ${instead}`] : []
      }),
    )
    expect(found).toEqual([])
  })
})
