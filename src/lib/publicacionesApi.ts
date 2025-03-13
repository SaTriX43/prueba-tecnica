interface Post {
  id: number;
  userId: number;
  title: string;
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
    console.error("Fallo el fetch publicaciones:", error);
    throw error;
  }
}
