// /src/features/course/course-mindmap.tsx
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { ReactFlow, type Edge } from "@xyflow/react";
import { Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { Mindmap } from "./markdown-schemas";
import { MarkdownRenderer } from "./markdown-renderer";
import {
  HandleX,
  HandleY,
  NodeTile,
  type CourseNodeProps,
  type EmbeddedNodeData,
  type EmbeddedNodeType,
} from "./course-node-components";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const CourseNode = (props: CourseNodeProps & { orientation?: string }) => {
  const { data, selected, orientation } = props;
  const HandleComponent = orientation === "x" ? HandleX : HandleY;

  return (
    <HandleComponent>
      <NodeTile selected={selected}>
        <NodeTile.Label>Embedded Resource</NodeTile.Label>
        <NodeTile.Name>{data.name}</NodeTile.Name>
      </NodeTile>
    </HandleComponent>
  );
};

type CourseMindmapProps = {
  mindmapData: Mindmap;
};

function CourseMindmap({ mindmapData }: CourseMindmapProps) {
  const { nodes, edges, orientation } = mindmapData;
  const isMobile = useMediaQuery("(max-width: 398px)");
  const minZoomValue = isMobile ? 0.2 : 0.5;

  const nodeTypes = useMemo(
    () => ({
      embedded: (props: CourseNodeProps) => (
        <CourseNode {...props} orientation={orientation} />
      ),
    }),
    [orientation],
  );

  const [selectedNodeData, setSelectedNodeData] =
    useState<EmbeddedNodeData | null>(null);

  const styledEdges = edges.map(({ type, ...edge }) => ({
    ...edge,
    type: "smoothstep",
    style: { stroke: "var(--foreground-secondary)", strokeWidth: 1.5 },
  }));

  const handleNodeClick = (_: React.MouseEvent, node: EmbeddedNodeType) => {
    setSelectedNodeData(node.data);
  };

  return (
    <>
      <Dialog
        open={!!selectedNodeData}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedNodeData(null);
          }
        }}
      >
        <DialogContent className="text-foreground border-foreground/10 max-h-[85vh] flex flex-col sm:max-w-3xl p-0 data-[state=closed]:duration-0">
          {selectedNodeData && (
            <>
              <DialogHeader className="px-6 py-4 border-b border-foreground/10">
                <DialogTitle className="text-regular-bold font-500 text-left">
                  Full Content
                </DialogTitle>
              </DialogHeader>

              <div className="overflow-y-auto px-6 flex-1">
                <MarkdownRenderer content={selectedNodeData.content} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div
        className="aspect-video bg-mindmap-gradient border-mindmap-gradient"
        aria-label="Mapa myśli kursu"
      >
        <ReactFlow
          nodes={nodes}
          edges={styledEdges as Edge[]}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          onNodeClick={handleNodeClick}
          panOnDrag={true}
          minZoom={minZoomValue}
        >
          <MiniMap className="!bg-background border-foreground/5 hidden tbt:block" />
        </ReactFlow>
      </div>
    </>
  );
}

export { CourseMindmap };
export type { CourseMindmapProps };
