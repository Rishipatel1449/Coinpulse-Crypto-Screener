"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Render a responsive table element wrapped in a horizontally scrollable container.
 *
 * @param className - Additional CSS classes merged with the component's default table classes
 * @returns A React element containing a table wrapped in a div with data-slot="table-container"; the table itself has data-slot="table" and combines default and provided classes
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a table header (<thead>) with standardized row bottom borders and a data-slot marker.
 *
 * @returns A `<thead>` element with a `data-slot="table-header"` attribute, a default bottom-border style applied to its rows, and any provided `className` and other props merged onto the element.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

/**
 * Table body element with consistent styling and a `data-slot="table-body"` attribute.
 *
 * @param className - Additional CSS classes to merge with the component's default body styles
 * @returns The rendered `<tbody>` element with the `data-slot="table-body"` attribute and merged class names
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled <tfoot> element for table footers.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @param props - Other attributes and event handlers forwarded to the underlying `<tfoot>` element
 * @returns A `<tfoot>` element with `data-slot="table-footer"`, default footer styles, and any merged classes/props
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a table row (<tr>) with consistent styling and a `data-slot="table-row"` attribute.
 *
 * @param className - Additional class names to merge with the component's default classes
 * @returns The rendered `<tr>` element with applied styles and forwarded props
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a table header cell (<th>) with consistent styling and a data-slot="table-head".
 *
 * Forwards all received props to the underlying <th> element.
 *
 * @returns The rendered `<th>` element with predefined classes for text color, height, horizontal padding, text alignment, vertical alignment, font weight, whitespace handling, and special layout adjustments for checkbox cells.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a table data cell (<td>) with default spacing, vertical alignment, no text wrapping, and a data-slot attribute for tooling.
 *
 * @returns The rendered `<td>` element with padding, middle vertical alignment, no wrapping, checkbox-specific spacing adjustments, merged `className`, and all received props forwarded to the underlying element.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a caption element for a table with consistent styling and a data-slot attribute.
 *
 * @returns The rendered `<caption>` element with muted foreground color, top margin, small text size, merged `className`, and `data-slot="table-caption"`.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};