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
        <DialogContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white max-h-[85vh] flex flex-col sm:max-w-3xl">
          {selectedNodeData && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="text-h3 font-500">
                  {selectedNodeData.name}
                </DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto mt-2 pr-4 -mr-4">
                <MarkdownRenderer
                  content={selectedNodeData.content}
                  headingIds={{}}
                />
              </div>
            </>
          )}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Zamknij</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <div
        className="w-full aspect-video rounded-[12px] overflow-hidden bg-black border border-[rgba(255,255,255,0.05)] mb-[48px] tbt:mb-[64px]"
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
          <Background color="#1A1A1A" gap={16} />
          <MiniMap
            nodeColor="#0BAD67"
            className="!bg-[#1A1A1A] border border-[rgba(255,255,255,0.05)] hidden tbt:block"
          />
        </ReactFlow>
      </div>
    </>
  );
}

export { CourseMindmap };
export type { CourseMindmapProps };
