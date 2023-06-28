import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="mb-8">
      <a
        href={href}
        className="inline-block font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h3 className="inline-block text-base font-medium text-skin-base decoration-dashed transition duration-500 hover:text-skin-accent">
          {title}
        </h3>
      </a>
      <p className="mt-1 text-sm text-skin-base opacity-60">{description}</p>
      <Datetime className="text-sm opacity-60" datetime={pubDatetime} />
    </li>
  );
}
