export interface TrelloCard {
    id: string
    title: string
  }
  
  export interface TrelloListProps {
    title: string
    cards: TrelloCard[]
    onAddCard: (title: string) => void
  }
  
  