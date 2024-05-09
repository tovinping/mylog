import clientPromise from '@/lib/mongodb';

export interface UserProps {
  content: string
  timestamp: number
  image?: string
}
export interface UserResponse {
  content: string
  timestamp: number
  image?: string
  _id: string;
}

export interface ResultProps {
  _id: string;
  users: UserResponse[];
}
export interface ILogProps {
  /**
   * 体重
   */
  weight: string;
  /**
   * 早餐
   */
  breakfast: string
  /**
   * 午餐
   */
  lunch: string
  /*
   * 晚餐
   */
  dinner: string
  /**
   * 跑步
   */
  running: string
  /**
   * 仰卧起坐
   */
  sitUps: string
  /**
   * 创建时间
   */
  timestamp?: number
  cid?: string
}

export async function getUser(username: string): Promise<UserProps | null> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  const results = await collection.findOne<UserProps>(
    { username },
    { projection: { _id: 0, emailVerified: 0 } }
  );
  if (results) {
    return {
      ...results,
    };
  } else {
    return null;
  }
}

export async function getAllUsers(): Promise<ILogProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.aggregate<ILogProps>([
    {
      $sort: {
        timestamp: -1
      }
    },
    {
      $addFields: {
        cid: {
          $toString: "$_id"
        },
        running123: {
          $toDouble: "$running"
        }
      }
    },
    {
      $project: {
        _id: 0,
      }
    }
  ]).toArray();
}

export async function searchUser(query: string): Promise<UserProps[]> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection
    .aggregate<UserProps>([
      {
        $search: {
          index: 'name-index',
          /* 
          name-index is a search index as follows:

          {
            "mappings": {
              "fields": {
                "followers": {
                  "type": "number"
                },
                "name": {
                  "analyzer": "lucene.whitespace",
                  "searchAnalyzer": "lucene.whitespace",
                  "type": "string"
                },
                "username": {
                  "type": "string"
                }
              }
            }
          }

          */
          text: {
            query: query,
            path: {
              wildcard: '*' // match on both name and username
            },
            fuzzy: {},
            score: {
              // search ranking algorithm: multiply relevance score by the log1p of follower count
              function: {
                multiply: [
                  {
                    score: 'relevance'
                  },
                  {
                    log1p: {
                      path: {
                        value: 'followers'
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        // filter out users that are not verified
        $match: {
          verified: true
        }
      },
      // limit to 10 results
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          emailVerified: 0,
          score: {
            $meta: 'searchScore'
          }
        }
      }
    ])
    .toArray();
}

export async function getUserCount(): Promise<number> {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.countDocuments();
}

export async function updateUser(username: string, bio: string) {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  return await collection.updateOne({ username }, { $set: { bio } });
}

export async function addLog(data: ILogProps) {
  const client = await clientPromise;
  const collection = client.db('test').collection('users');
  console.log(`cccc`, JSON.stringify(data))
  return await collection.insertOne(data);
}