import type { SVGProps } from "react";

type RoomIconProps = {
  name: string;
  className?: string;
};

function IconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

export function RoomIcon({ name, className }: RoomIconProps) {
  switch (name) {
    case "room":
      return (
        <IconBase className={className}>
          <path d="M4 11 12 4l8 7" />
          <path d="M6 10.5V20h12v-9.5" />
          <path d="M10 20v-6h4v6" />
        </IconBase>
      );
    case "archive":
      return (
        <IconBase className={className}>
          <path d="M4 7h16" />
          <path d="M5 7l1.5 13h11L19 7" />
          <path d="M8 4h8l1 3H7l1-3Z" />
          <path d="M9 11h6" />
        </IconBase>
      );
    case "desk":
      return (
        <IconBase className={className}>
          <path d="M4 10h16" />
          <path d="M6 10v8" />
          <path d="M18 10v8" />
          <path d="M8 6h8l1 4H7l1-4Z" />
        </IconBase>
      );
    case "monitor":
      return (
        <IconBase className={className}>
          <rect x="4" y="5" width="16" height="11" rx="2" />
          <path d="M9 20h6" />
          <path d="M12 16v4" />
          <path d="m8 10 2 2-2 2" />
          <path d="M13 14h3" />
        </IconBase>
      );
    case "notebook":
      return (
        <IconBase className={className}>
          <path d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </IconBase>
      );
    case "toolbox":
      return (
        <IconBase className={className}>
          <path d="M9 7V5h6v2" />
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M4 12h16" />
          <path d="M10 12v2h4v-2" />
        </IconBase>
      );
    case "idea":
      return (
        <IconBase className={className}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.7-1.5 2.5h-4c0-.8-.6-1.8-1.5-2.5Z" />
        </IconBase>
      );
    case "bookshelf":
      return (
        <IconBase className={className}>
          <path d="M4 19h16" />
          <path d="M6 5h3v14H6z" />
          <path d="M10 8h3v11h-3z" />
          <path d="M14 6h4l-1 13h-3z" />
        </IconBase>
      );
    case "timeline":
      return (
        <IconBase className={className}>
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12H2" />
          <path d="M22 12h-2" />
        </IconBase>
      );
    case "about":
      return (
        <IconBase className={className}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </IconBase>
      );
    default:
      return (
        <IconBase className={className}>
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </IconBase>
      );
  }
}
