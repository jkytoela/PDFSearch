export type ESSource = {
  id: number;
  data: string;
};

export type ESSearchBody = {
  index: string;
  query: {
    match: { data: string };
  };
  highlight: {
    'fragment_size': string;
    fields: {
      data: unknown;
    };
  };
};
