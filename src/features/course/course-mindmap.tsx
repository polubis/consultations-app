import type React from "react";
import { useMemo, useState } from "react";
import { ReactFlow, type Edge } from "@xyflow/react";
import {
  Background,
  Controls,
  MiniMap,
  Position,
  Handle,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Mindmap } from "./markdown-schemas";
import {
  HandleX,
  HandleY,
  NodeTile,
  type CourseNodeProps,
  type EmbeddedNodeData,
  type EmbeddedNodeType,
} from "./course-node-components";

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

  // ZMIANA: Rejestrujemy nasz nowy, inteligentny komponent węzła
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

  // ZMIANA: Używamy krawędzi typu 'smoothstep' dla ładniejszego wyglądu
  const styledEdges = edges.map(({ type, ...edge }) => ({
    ...edge,
    type: "smoothstep", // To nada krawędziom zaokrąglony wygląd
    style: { stroke: "#0BAD67", strokeWidth: 1.5 },
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
        <DialogContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
          {selectedNodeData && (
            <>
              <DialogHeader>
                <DialogTitle className="text-h3 font-500">
                  {selectedNodeData.name}
                </DialogTitle>
              </DialogHeader>
              <p className="text-regular text-foreground-secondary whitespace-pre-wrap mt-2">
                {selectedNodeData.content}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div
        className="w-full aspect-video rounded-[12px] overflow-hidden bg-black border border-[rgba(255,255,255,0.05)] mb-[48px] tbt:mb-[64px]"
        aria-label="Mapa myśli kursu"
      >
        <ReactFlow
          nodes={nodes}
          edges={styledEdges as Edge[]} // Rzutowanie jest tu bezpieczne
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          onNodeClick={handleNodeClick}
          panOnDrag={true}
        >
          <Background color="#1A1A1A" gap={16} />
          <Controls
            showInteractive={false}
            className="[&>button]:bg-[#141414] [&>button]:border-none [&_path]:fill-white"
          />
          <MiniMap
            nodeColor="#0BAD67"
            className="!bg-[#1A1A1A] border border-[rgba(255,255,255,0.05)]"
          />
        </ReactFlow>
      </div>
    </>
  );
}

export { CourseMindmap };
export type { CourseMindmapProps };
