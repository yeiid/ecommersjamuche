import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, f as renderSlot } from './astro/server_W1JgSjoG.mjs';
/* empty css                           */

const $$Astro = createAstro("https://jamuchee.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    disabled = false,
    type = "button",
    href,
    ariaLabel,
    id,
    class: className = "",
    ...rest
  } = Astro2.props;
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring";
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-600",
    accent: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
    outline: "border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700",
    link: "bg-transparent text-primary-600 dark:text-primary-400 hover:underline hover:bg-transparent p-0"
  };
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md"
  };
  const stateClasses = {
    disabled: "opacity-50 cursor-not-allowed pointer-events-none",
    fullWidth: "w-full"
  };
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? stateClasses.fullWidth : "",
    disabled ? stateClasses.disabled : "",
    className
  ].filter(Boolean).join(" ");
  const Element = href ? "a" : "button";
  const attrs = {
    ...href ? { href } : { type },
    disabled: href ? void 0 : disabled,
    "aria-label": ariaLabel,
    id,
    class: classes,
    ...rest
  };
  return renderTemplate`${renderComponent($$result, "Element", Element, { ...attrs, "data-astro-cid-6ygtcg62": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} `;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/Button.astro", void 0);

export { $$Button as $ };
