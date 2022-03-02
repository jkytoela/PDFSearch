import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query';
import { PDFResponse } from '../validations';
import type { PDF } from '../validations';

export const getPdfs = async ({ text }: { text: string }): Promise<PDF[]> => {
  const url = text.length > 0 ? `/pdf?text=${text}` : '/pdf';

  // The data should be PDF[], but...
  const data = await axios.get<PDF[]>(url);
  
  // ... can't be sure, so parse and validate it
  return PDFResponse.parse(data);
};

type QueryFnType = typeof getPdfs;

type UsePdfsOptions = {
  text: string;
  config?: QueryConfig<QueryFnType>;
};

export const usePdfs = ({ text, config }: UsePdfsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['pdfs', text],
    queryFn: () => getPdfs({ text }),
  });
};
