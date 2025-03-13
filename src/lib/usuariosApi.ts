interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  }
  
export async function usuariosGet(): Promise<User[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
        throw new Error(`Error fetching usuarios: ${response.statusText}`);
        }

        const data: User[] = await response.json(); // Directamente un array de User
        console.log(data)
        return data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
}