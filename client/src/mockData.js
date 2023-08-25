// mockData.js
export const mockUsers = [
    {
      id: 1,
      username: 'JohnDoe',
      password: 'john123', 
      wins: 10,
      losses: 5,
    },
    // Other users...
  ];
  
  export const mockFighters = [
    {
      id: 1,
      name: 'Fighter1',
      hp: 150,
      ap: 20
    },
    // Other fighters...
  ];
  
  export const mockMatches = [
    {
      id: 1,
      userId: 1, // Corresponds to JohnDoe's id
      opponent: 'OpponentUsername',
      result: 'win',
    },
    // Other matches...
  ];
  