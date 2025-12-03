declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FC<any>;
  export default ReactComponent;
}

declare module '*.webp' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module 'expo-router/entry' {
  const value: any;
  export default value;
}
