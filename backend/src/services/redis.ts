import { createClient } from 'redis';

const redis = createClient({ url: 'redis://redis' });

export default redis;
