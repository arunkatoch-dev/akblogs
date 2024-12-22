import React, { memo } from "react";

const CardTags = ({ tag }) => {
  return (
    <div className="px-4 py-2 rounded-full flex items-center justify-center bg-transparent dark:bg-foreground">
      <span className="text-base text-primary">{tag}</span>
    </div>
  );
};

export default memo(CardTags);
