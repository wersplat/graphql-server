import { User, Player, UserInput, UserUpdateInput, PlayerTier } from '../types/User';
import { supabaseService } from '../services/supabase';

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
      tier: 'diamond' as any,
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
      tier: 'gold' as any,
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
      tier: 'platinum' as any,
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
        const user = await supabaseService.instance.getUser(id);
        return user as unknown as User;
      } catch (error) {
        console.error('Error fetching user from Supabase:', error);
        // Fallback to mock data
        const user = mockUsers.find(u => u.id === id);
        return user || null;
      }
    },

    getUsers: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }): Promise<User[]> => {
      console.log(`Getting users with limit: ${limit}, offset: ${offset}`);
      try {
        const users = await supabaseService.instance.getUsers(limit, offset);
        return users as unknown as User[];
      } catch (error) {
        console.error('Error fetching users from Supabase:', error);
        // Fallback to mock data
        return mockUsers.slice(offset, offset + limit);
      }
    }
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }): Promise<User> => {
      console.log('Creating new user:', input);
      
      try {
        const userData = {
          username: input.username,
          email: input.email,
          full_name: input.fullName,
          is_active: input.isActive ?? true,
          is_admin: input.isAdmin ?? false,
          discord_id: input.discordId
        };
        
        const newUser = await supabaseService.instance.createUser(userData);
        return newUser as User;
      } catch (error) {
        console.error('Error creating user in Supabase:', error);
        // Fallback to mock data
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
      }
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
      return mockUsers.find(u => u.id === parent.userId) || {} as User;
    }
  }
}; 