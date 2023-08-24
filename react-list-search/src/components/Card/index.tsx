interface ICard {
  image: {
    src: string;
    alt: string;
  };
  children: JSX.Element;
}

export const Card = (props: ICard) => {
  const { children, image } = props;
  return (
    <div className="rounded-md overflow-hidden bg-white shadow-md">
      <img
        className="w-full"
        /* src={`${article.image.url.replace('{width}', '400').replace('{height}', '200')}`}
          alt="Random" */
        src={image.src}
        alt={image.alt}
      />
      <div className="p-3">{children}</div>
    </div>
  );
};
