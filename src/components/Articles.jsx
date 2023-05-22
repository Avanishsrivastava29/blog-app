import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (articleId, imageUrl) => {
    try {
      // Delete the article document from Firestore
      await deleteDoc(doc(db, "Articles", articleId));
      
      // TODO: Delete the associated image from storage (if necessary)

      console.log("Article deleted successfully!");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="container">
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-md-3">
                  <Link to={`/article/${id}`}>
                    <img src={imageUrl} alt="title" className="img-fluid" />
                  </Link>
                </div>
                <div className="col-md-9 ps-md-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      {user && user.uid === userId && (
                        <DeleteArticle
                          id={id}
                          imageUrl={imageUrl}
                          onDelete={() => handleDelete(id, imageUrl)}
                        />
                      )}
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <p>{description}</p>

                  <div className="d-flex justify-content-end align-items-center">
                    {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
