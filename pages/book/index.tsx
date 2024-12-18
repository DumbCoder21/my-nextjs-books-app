import { GetServerSideProps } from "next";
import Link from "next/link";

interface Book {
    id: number | string; // Allow both number and string for id
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn: string;
    published: string;
    publisher: string;
  }
  

interface BooksPageProps {
  books: Book[];
}

const BooksPage = ({ books }: BooksPageProps) => {
  return (
    <div>
      <h1>Book List</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Description</th>
            <th>ISBN</th>
            <th>Published Date</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <Link href={`/book/${book.id}`}>
                  {book.title}
                </Link>
              </td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td>{book.isbn}</td>
              <td>{book.published}</td>
              <td>{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch("https://fakerapi.it/api/v1/books");
    const data = await response.json();

    return {
      props: {
        books: data.data, // The books array is inside 'data.data' based on API response
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        books: [],
      },
    };
  }
};

export default BooksPage;
