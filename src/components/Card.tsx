import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="mb-8">
      <a
        href={href}
        className="inline-block font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-xl font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-xl font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <p className="mt-1 text-sm text-skin-base opacity-50">{description}</p>
      <Datetime className="mt-3" datetime={pubDatetime} />
    </li>
  );
}
