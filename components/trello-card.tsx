interface TrelloCardProps {
    title: string
  }
  
  export function TrelloCard({ title }: TrelloCardProps) {
    return (
      <div className="p-3 mb-2 bg-white rounded-lg shadow-sm">
        <p className="text-sm text-gray-700">{title}</p>
      </div>
    )
  }
  
  