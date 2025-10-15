import type { ReactNode } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Node } from "@xyflow/react";

export type EmbeddedNodeData = {
  name: string;
  content: string;
  description: string | null;
};
export type EmbeddedNodeType = Node<EmbeddedNodeData, "embedded">;
export type CourseNodeProps = NodeProps<EmbeddedNodeType>;

const commonHandleClass =
  "!bg-transparent border-2 border-[rgba(255,255,255,0.2)]";

export const HandleX = ({ children }: { children: ReactNode }) => (
  <>
    <Handle
      className={commonHandleClass}
      type="target"
      position={Position.Left}
    />
    {children}
    <Handle
      className={commonHandleClass}
      type="source"
      position={Position.Right}
    />
  </>
);

export const HandleY = ({ children }: { children: ReactNode }) => (
  <>
    <Handle
      className={commonHandleClass}
      type="target"
      position={Position.Top}
    />
    {children}
    <Handle
      className={commonHandleClass}
      type="source"
      position={Position.Bottom}
    />
  </>
);

// --- Komponent Kafelka Węzła (NodeTile) ---
const NodeTileComponent = ({
  children,
  selected,
}: {
  children: ReactNode;
  selected: boolean;
}) => (
  <div
    className={`bg-[#141414] border-2 rounded-[8px] px-4 py-3 w-[280px] text-left transition-colors ${
      selected ? "border-primary-500" : "border-[rgba(255,255,255,0.1)]"
    }`}
  >
    {children}
  </div>
);

NodeTileComponent.Label = ({ children }: { children: ReactNode }) => (
  <p className="text-small text-foreground-secondary mb-0.5">{children}</p>
);

NodeTileComponent.Name = ({ children }: { children: ReactNode }) => (
  <h3 className="text-regular font-500 text-foreground line-clamp-2">
    {children}
  </h3>
);

export const NodeTile = NodeTileComponent;
