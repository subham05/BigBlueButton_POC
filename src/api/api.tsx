import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Post, CreatePost, UpdatePost} from '../models/postModel';
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.0.114:4000/api/v1/'}),
  tagTypes: ['Post'],
  refetchOnReconnect: true,
  endpoints: builder => ({
    posts: builder.query<Post, void>({
      query: () => 'posts',
      transformResponse: (response: any) => {
        console.log('--', response.body.slice(0, 10));

        return {body: response.body.slice(0, 10)}; // Take the first 10 items
      },
      providesTags: ['Post'],
    }),
    addPost: builder.mutation<void, CreatePost>({
      query: post => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),

      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<void, UpdatePost>({
      query: ({id, ...rest}) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Post'],
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('posts', undefined, (draft: any) => {
            console.log(
              'draft',
              draft?.body?.filter((post: any) => post?.id === id),
            );
            return {
              body: draft?.body?.filter((post: any) => post?.id !== id),
            };
          }),
        );
        try {
          const value = await queryFulfilled;
          console.log('----response', value.data);
        } catch {
          patchResult.undo();
          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
  }),
});
export const {
  usePostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
