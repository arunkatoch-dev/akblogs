import { memo } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";

const iconsStyles = "text-lg hover:text-primary";

const Alignments = ({ editor }) => {
  return (
    <div className="px-2 flex gap-3" title="Text Alignments">
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        title="Align Left"
      >
        <FaAlignLeft className={iconsStyles} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        title="Align Center"
      >
        <FaAlignCenter className={iconsStyles} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        title="Align Right"
      >
        <FaAlignRight className={iconsStyles} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
        title="Align Justify"
      >
        <FaAlignJustify className={iconsStyles} />
      </button>
    </div>
  );
};

export default memo(Alignments);
