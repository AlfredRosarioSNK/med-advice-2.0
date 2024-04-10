function NewsList({ newsItems }) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Top trending</h1>
        <div className="news-list">
          {newsItems.slice(0, 6).map((item, index) => ( // Solo toma los primeros 6 elementos
            <div key={index} className="news-item">
              <img src={item.urlToImage} alt={item.title} className="news-item-image" />
              <div className="news-item-content">
                <h3>{item.title}</h3>
                <p>{item.publishedAt.split('T')[0]} - {item.source.name}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
  
export default NewsList;
