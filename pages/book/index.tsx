import { GetServerSideProps } from "next";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  published: string;
  publisher: string;
  image: string;
}

interface BookDetailProps {
  book: Book;
}

const BookDetail = ({ book }: BookDetailProps) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} width="200" />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Published Date:</strong> {book.published}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const response = await fetch(`https://fakerapi.it/api/v1/books/${id}`);
    const data = await response.json();

    return {
      props: {
        book: data, // API will return book details
      },
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return {
      notFound: true,
    };
  }
};

export default BookDetail;
