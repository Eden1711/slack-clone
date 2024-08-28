interface WorkspaceIdPageProps {
  params: { id: string };
}

const WorkspacePage = ({ params }: WorkspaceIdPageProps) => {
  return <div>ID: {params.id}</div>;
};

export default WorkspacePage;
