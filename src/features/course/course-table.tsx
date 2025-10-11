type CourseTableProps = {
  children: React.ReactNode;
};

function CourseTable({ children }: CourseTableProps) {
  return (
    <div className="overflow-x-auto w-full mb-[48px] tbt:mb-[64px]">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden bg-black">{children}</div>
      </div>
    </div>
  );
}

export { CourseTable };
export type { CourseTableProps };
