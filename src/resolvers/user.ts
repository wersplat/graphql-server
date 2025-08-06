import { User, Player, UserInput, UserUpdateInput, PlayerTier } from '../types/User';
import { PgGraphQLService } from '../services/pg-graphql';

// Mock data for development (fallback)
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@bodegacatsgc.gg',
    fullName: 'Admin User',
    isActive: true,
    isAdmin: true,
    discordId: '123456789',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    player: {
      id: '1',
      userId: '1',
      gamertag: 'AdminPlayer',
      region: 'PS5',
      currentRp: 2500.0,
      peakRp: 2800.0,
      tier: PlayerTier.DIAMOND,
      teamName: 'Bodega Cats',
      isVerified: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      user: {} as User // Will be populated by resolver
    }
  },
  {
    id: '2',
    username: 'player1',
    email: 'player1@bodegacatsgc.gg',
    fullName: 'John Doe',
    isActive: true,
    isAdmin: false,
    discordId: '987654321',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-10'),
    player: {
      id: '2',
      userId: '2',
      gamertag: 'PlayerOne',
      region: 'Xbox',
      currentRp: 1800.0,
      peakRp: 2000.0,
      tier: PlayerTier.GOLD,
      teamName: 'Alpha Team',
      isVerified: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-10'),
      user: {} as User // Will be populated by resolver
    }
  },
  {
    id: '3',
    username: 'player2',
    email: 'player2@bodegacatsgc.gg',
    fullName: 'Jane Smith',
    isActive: true,
    isAdmin: false,
    discordId: '555666777',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-12'),
    player: {
      id: '3',
      userId: '3',
      gamertag: 'PlayerTwo',
      region: 'PC',
      currentRp: 2200.0,
      peakRp: 2400.0,
      tier: PlayerTier.PLATINUM,
      teamName: 'Beta Team',
      isVerified: false,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-12'),
      user: {} as User // Will be populated by resolver
    }
  }
];

// Populate user references in player objects
mockUsers.forEach(user => {
  if (user.player) {
    user.player.user = user;
  }
});

export const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<User | null> => {
      console.log(`Getting user with ID: ${id}`);
      try {
        const player = await PgGraphQLService.instance.getPlayer(id);
        if (!player) return null;
        
        // Create a User object from the player data
        const user: User = {
          id: player.id,
          username: player.gamertag,
          email: `${player.gamertag}@bodegacatsgc.gg`,
          fullName: player.gamertag,
          isActive: true,
          isAdmin: false,
          discordId: undefined, // Will be populated from player data if available
          createdAt: player.createdAt,
          updatedAt: player.updatedAt,
          player: {
            ...player,
            tier: player.tier as PlayerTier,
            user: {} as User // Will be populated by resolver
          }
        };

        // Set up circular reference
        if (user.player) {
          user.player.user = user;
        }
        
        return user;
      } catch (error) {
        console.error('Error fetching user from pg_graphql:', error);
        // Fallback to mock data
        const user = mockUsers.find(u => u.id === id);
        return user || null;
      }
    },

    getUsers: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }): Promise<User[]> => {
      console.log(`Getting users with limit: ${limit}, offset: ${offset}`);
      try {
        const players = await PgGraphQLService.instance.getPlayers(limit, offset);
        
        // Transform players to User format
        return players.map((player: any) => {
          const user: User = {
            id: player.id,
            username: player.gamertag,
            email: `${player.gamertag}@bodegacatsgc.gg`,
            fullName: player.gamertag,
            isActive: true,
            isAdmin: false,
            discordId: undefined,
            createdAt: player.createdAt,
            updatedAt: player.updatedAt,
            player: {
              ...player,
              tier: player.tier as PlayerTier,
              user: {} as User // Will be populated by resolver
            }
          };

          // Set up circular reference
          if (user.player) {
            user.player.user = user;
          }
          
          return user;
        });
      } catch (error) {
        console.error('Error fetching users from pg_graphql:', error);
        // Fallback to mock data
        return mockUsers.slice(offset, offset + limit);
      }
    },

    getPlayer: async (_: any, { id }: { id: string }): Promise<Player | null> => {
      console.log(`Getting player with ID: ${id}`);
      try {
        const player = await PgGraphQLService.instance.getPlayer(id);
        if (!player) return null;

        // Create a User object for the player
        const user: User = {
          id: player.id,
          username: player.gamertag,
          email: `${player.gamertag}@bodegacatsgc.gg`,
          fullName: player.gamertag,
          isActive: true,
          isAdmin: false,
          discordId: undefined,
          createdAt: player.createdAt,
          updatedAt: player.updatedAt,
          player: undefined // Will be set below
        };

        // Create the Player object with the user reference
        const playerWithUser: Player = {
          ...player,
          tier: player.tier as PlayerTier,
          user: user
        };

        // Set up circular reference
        user.player = playerWithUser;
        
        return playerWithUser;
      } catch (error) {
        console.error('Error fetching player from pg_graphql:', error);
        // Fallback to mock data
        const user = mockUsers.find(u => u.id === id);
        return user?.player || null;
      }
    },

    getPlayers: async (_: any, { 
      tier, 
      region, 
      limit = 20, 
      offset = 0 
    }: { 
      tier?: PlayerTier; 
      region?: string; 
      limit?: number; 
      offset?: number; 
    }): Promise<Player[]> => {
      console.log(`Getting players with filters: tier=${tier}, region=${region}, limit=${limit}, offset=${offset}`);
      try {
        const filters: any = {};
        if (tier) filters.tier = tier;
        if (region) filters.region = region;
        
        const players = await PgGraphQLService.instance.getPlayers(limit, offset, filters);
        
        return players.map((player: any) => {
          // Create a User object for the player
          const user: User = {
            id: player.id,
            username: player.gamertag,
            email: `${player.gamertag}@bodegacatsgc.gg`,
            fullName: player.gamertag,
            isActive: true,
            isAdmin: false,
            discordId: undefined,
            createdAt: player.createdAt,
            updatedAt: player.updatedAt,
            player: undefined // Will be set below
          };

          // Create the Player object with the user reference
          const playerWithUser: Player = {
            ...player,
            tier: player.tier as PlayerTier,
            user: user
          };

          // Set up circular reference
          user.player = playerWithUser;
          
          return playerWithUser;
        });
      } catch (error) {
        console.error('Error fetching players from pg_graphql:', error);
        // Fallback to mock data
        let filteredPlayers = mockUsers.map(u => u.player).filter(Boolean) as Player[];

        if (tier) {
          filteredPlayers = filteredPlayers.filter(p => p.tier === tier);
        }

        if (region) {
          filteredPlayers = filteredPlayers.filter(p => p.region === region);
        }

        return filteredPlayers.slice(offset, offset + limit);
      }
    }
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<User> => {
      console.log('Creating new user:', input);
      
      // For now, we'll use mock data since creating users might require additional logic
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        username: input.username,
        email: input.email,
        fullName: input.fullName || undefined,
        isActive: input.isActive ?? true,
        isAdmin: input.isAdmin ?? false,
        discordId: input.discordId || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockUsers.push(newUser);
      return newUser;
    },

    updateUser: (_: any, { id, input }: { id: string; input: UserUpdateInput }): User => {
      console.log(`Updating user ${id}:`, input);
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }

      const existingUser = mockUsers[userIndex]!;
      const updatedUser: User = {
        ...existingUser,
        ...input,
        updatedAt: new Date()
      };

      mockUsers[userIndex] = updatedUser;
      return updatedUser;
    },

    deleteUser: (_: any, { id }: { id: string }): boolean => {
      console.log(`Deleting user with ID: ${id}`);
      
      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }

      mockUsers.splice(userIndex, 1);
      return true;
    }
  },

  User: {
    player: (parent: User): Player | null => {
      return parent.player || null;
    }
  },

  Player: {
    user: (parent: Player): User => {
      return parent.user;
    }
  }
}; 