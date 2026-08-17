import Image from "next/image";

type Props = {
  title: string;
  author: string;
  category: string;
  coverUrl?: string;
  priority?: boolean;
  className?: string;
};

const tones = ["sage", "rust", "navy", "ochre", "plum"] as const;

export function BookCover({ title, author, category, coverUrl, priority, className = "" }: Props) {
  const tone = tones[
    Array.from(category || title).reduce((sum, char) => sum + char.charCodeAt(0), 0) % tones.length
  ];

  return (
    <div className={`book-cover book-cover--${tone} ${className}`}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={`Cover of ${title} by ${author}`}
          fill
          priority={priority}
          sizes="(max-width: 600px) 42vw, (max-width: 1000px) 25vw, 220px"
          className="book-cover__image"
        />
      ) : (
        <div className="book-cover__fallback" role="img" aria-label={`Cover of ${title} by ${author}`}>
          <span className="book-cover__eyebrow">NV EDITION</span>
          <strong>{title}</strong>
          <span>{author}</span>
        </div>
      )}
    </div>
  );
}
