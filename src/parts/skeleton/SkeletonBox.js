import ContentLoader from "react-content-loader";

const SkeletonBox = () => (
  <div className="d-flex">
    <ContentLoader
      viewBox="0 0 55 60"
      height={60}
      width={55}
      speed={1}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="10" rx="2" ry="2" width="55" height="60" />
    </ContentLoader>

    <ContentLoader
      viewBox="0 0 55 60"
      height={60}
      width={55}
      speed={1}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginLeft: 6 }}
    >
      <rect x="0" y="10" rx="2" ry="2" width="55" height="60" />
    </ContentLoader>

    <ContentLoader
      viewBox="0 0 55 60"
      height={60}
      width={55}
      speed={1}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginLeft: 6 }}
    >
      <rect x="0" y="10" rx="2" ry="2" width="55" height="60" />
    </ContentLoader>

    <ContentLoader
      viewBox="0 0 55 60"
      height={60}
      width={55}
      speed={1}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ marginLeft: 6 }}
    >
      <rect x="0" y="10" rx="2" ry="2" width="55" height="60" />
    </ContentLoader>
  </div>
);

export default SkeletonBox;
