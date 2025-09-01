

export default function BoardsPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Boards</h1>
        <p className="dashboard-subtitle">Manage and organize your projects</p>
      </div>
      <div className="dashboard-content">
        <div className="board-card">
          <h2 className="board-title">Sample Board</h2>
          <p className="board-updated">Last updated: 2 hours ago</p>
        </div>
        <div className="board-card">
          <h2 className="board-title">Project Planning</h2>
          <p className="board-updated">Last updated: 1 day ago</p>
        </div>
        <div className="board-card">
          <h2 className="board-title">Team Tasks</h2>
          <p className="board-updated">Last updated: 3 days ago</p>
        </div>
        <button className="create-board-button">
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Create New Board
        </button>
      </div>
    </div>
  );
}
