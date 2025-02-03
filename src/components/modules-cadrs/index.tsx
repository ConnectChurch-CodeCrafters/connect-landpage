import { Card } from "./styles";

interface IModulesCards {
  title: string;
  description: string;
  iconUrl: string;
}

export const ModulesCards: React.FC<IModulesCards> = ({
  description,
  iconUrl,
  title,
}) => {
  const truncateText = (text: string) => {
    const limit = 100;
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <>
      <Card>
        <div className="top">
          <div className="icon-container">
            <div className="circle">
              <img src={iconUrl} alt="icon" className="icon" />
            </div>
          </div>
          <span className="title text-md text-center font-semibold">
            {title}
          </span>
        </div>
        <p className="description">{truncateText(description)}</p>
      </Card>
    </>
  );
};
