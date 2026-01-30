"use client";

import React, { useState, useCallback } from "react";
import type { SlideContent as SlideContentType } from "@/types/slides";

interface SlideContentProps {
  content: SlideContentType[];
  onContentChange: (index: number, text: string) => void;
}

interface EditableItemProps {
  item: SlideContentType;
  index: number;
  onSave: (index: number, text: string) => void;
}

function EditableItem({ item, index, onSave }: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const focusRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (node) {
      node.focus();
      node.select();
    }
  }, []);

  const startEditing = () => {
    setEditText(item.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editText !== item.text) {
      onSave(index, editText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <textarea
        ref={focusRef}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded bg-background resize-none text-base"
        rows={2}
      />
    );
  }

  if (item.type === "bullet") {
    return (
      <li
        onClick={startEditing}
        className="cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
        title="Click to edit"
      >
        {item.text}
      </li>
    );
  }

  return (
    <p
      onClick={startEditing}
      className="cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
      title="Click to edit"
    >
      {item.text}
    </p>
  );
}

export function SlideContent({ content, onContentChange }: SlideContentProps) {
  const elements: React.ReactElement[] = [];
  let bulletGroup: { item: SlideContentType; index: number }[] = [];

  const flushBullets = () => {
    if (bulletGroup.length > 0) {
      elements.push(
        <ul key={`bullets-${bulletGroup[0].index}`} className="list-disc pl-6 space-y-2">
          {bulletGroup.map(({ item, index }) => (
            <EditableItem
              key={index}
              item={item}
              index={index}
              onSave={onContentChange}
            />
          ))}
        </ul>
      );
      bulletGroup = [];
    }
  };

  content.forEach((item, index) => {
    if (item.type === "bullet") {
      bulletGroup.push({ item, index });
    } else {
      flushBullets();
      elements.push(
        <EditableItem
          key={index}
          item={item}
          index={index}
          onSave={onContentChange}
        />
      );
    }
  });

  flushBullets();

  return <div className="space-y-4 text-lg">{elements}</div>;
}
