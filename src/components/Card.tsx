import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="-mx-3 mb-8 box-border rounded-md p-3 transition-colors duration-100 hover:bg-skin-card-hover">
      <a
        href={href}
        className="inline-block w-full font-medium decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <div className="flex items-baseline justify-between">
          <h3 className="inline-block text-lg font-medium text-skin-secondary decoration-dashed">
            {title}
          </h3>
          <Datetime
            className="shrink-0 text-sm text-skin-muted"
            datetime={pubDatetime}
          />
        </div>
      </a>
      <p className="mt-1 text-sm text-skin-body">{description}</p>
    </li>
  );
}
