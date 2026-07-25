/**
 * Layout primitives, matching the landing page sections.
 *
 * Gutters live on an *outer* element and the cap on an *inner* one, so the
 * max-width is the true content width — putting both on one element would make
 * border-box subtract the padding from the cap.
 */

/** Horizontal gutters for page shells. Pair with a `*Width` class on a child. */
export const pagePadding = 'px-5 md:px-16'

/** Page content cap. */
export const contentWidth = 'mx-auto w-full max-w-6xl'

/** The navbar runs wider than page content so the nav sits further out. */
export const navbarWidth = 'mx-auto w-full max-w-7xl'
