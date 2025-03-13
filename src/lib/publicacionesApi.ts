interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export async function publicacionesGet(): Promise<Post[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`Error fetching publicaciones: ${response.statusText}`);
    }
    const data: Post[] = await response.json();
    console.log("Publicaciones obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Falló el fetch publicaciones:", error);
    throw error;
  }
}

export async function publicacionGetPorId(id: string): Promise<Post> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching publicación con id ${id}: ${response.statusText}`);
    }
    const data: Post = await response.json();
    console.log("Publicación obtenida:", data);
    return data;
  } catch (error) {
    console.error(`Falló el fetch de la publicación con id ${id}:`, error);
    throw error;
  }
}

export async function comentariosGetPorPublicacionId(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error(`Error fetching comentarios para la publicación con id ${postId}: ${response.statusText}`);
    }
    const data: Comment[] = await response.json();
    console.log(`Comentarios obtenidos para la publicación con id ${postId}:`, data);
    return data;
  } catch (error) {
    console.error(`Falló el fetch de comentarios para la publicación con id ${postId}:`, error);
    throw error;
  }
}