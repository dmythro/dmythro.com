**`agent-skills`** — колекція навичок для **AI-асистентів** програмування, таких як **Claude Code**, **OpenCode** та інших агентів, сумісних з платформою [skills.sh](https://skills.sh).

Кожна навичка — це модуль знань, що надає AI-агенту експертизу в конкретній області. Наразі колекція містить п'ять навичок:

- **bun-cli** — довідник Bun CLI: керування пакетами, скрипти, тестування, бандлінг та компіляція
- **bun-api** — API Bun runtime: файловий I/O, шел, SQLite, SQL-клієнт (PostgreSQL/MySQL), хешування, стиснення
- **git-commit** — формат Conventional Commits для git-комітів та заголовків PR/MR
- **git-pr** — робочі процеси PR та MR для GitHub (`gh`) і GitLab (`glab`): створення, рев'ю, коментарі, злиття
- **git-ci** — запити стану CI/CD для GitHub Actions та GitLab CI

```sh
# Встановити одну навичку
bunx skills add dmythro/agent-skills --skill bun-cli

# Встановити всі навички
bunx skills add dmythro/agent-skills
```

Навички встановлюються на рівні проєкту або глобально й автоматично активуються, коли агент виявляє відповідний контекст — наприклад, навичка **bun-cli** активується при роботі в проєкті з `bun.lock` чи `bunfig.toml`.
