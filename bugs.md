<ListGroup variant="flush">
    <ListGroup.Item>
                <h3>Comments:</h3>
    </ListGroup.Item>
              {service && (
                <ListGroup.Item>
                  {service.report.map((review) => (
                    <div>
                    {review.comment && (
                        <ListGroup.Item key={review._id}>
                        {review.hasOwnProperty("img") ? (
                            <img
                            src={handleImageCreation({ review })}
                            alt="Helpful alt text"
                            style={{ maxHeight: "9rem", maxWidth: "9rem" }}
                            />
                        ) : (
                            <p></p>
                        )}
                        <Row>
                            <strong>{review.createdAt.substring(0, 10)}</strong>
                        </Row>
                        <Row>
                            <span>{review.comment}</span>
                        </Row>
                          <div/>
                    </ListGroup.Item>)}
    </ListGroup.Item>)}
</ListGroup>