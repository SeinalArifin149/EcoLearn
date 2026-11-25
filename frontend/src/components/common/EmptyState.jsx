import React from 'react';
import CharacterIllustration from './CharacterIllustration';
import Button from './Button';

export default function EmptyState({
  title = 'Belum Ada Data Tersedia',
  description = 'Data atau aktivitas belum ditemukan pada halaman ini.',
  expression = 'curious',
  character = 'boy',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div className={`p-8 text-center flex flex-col items-center justify-center space-y-4 ${className}`}>
      <CharacterIllustration
        character={character}
        expression={expression}
        size="md"
        alt={title}
        className="drop-shadow-md"
      />
      
      <div className="space-y-1 max-w-sm">
        <h4 className="text-base font-black text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}
