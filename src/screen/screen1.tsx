import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  useAddPostMutation,
  useDeletePostMutation,
  usePostsQuery,
  useUpdatePostMutation,
} from '../api/api';
import {postsApi} from '../api/api';
import {useAppDispatch} from '../redux/hook';
import {UpdatePost} from '../models/postModel';

const Screen1 = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const {data, error, isLoading, isSuccess, isFetching} = usePostsQuery(
    undefined,
    {skip: shouldFetch},
  );
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const dispatch = useAppDispatch();
  console.log('error', error);
  let post = {
    userName: 'Terece WilliamnewOne1234569',
    caption:
      'I just had a wonderful breakfast at the Resort Today. How does your day look?',
    tags: ['#resortNomad', '#breakfast', '#chirpzMorning'],
  };
  let update = {
    id: '45555901',
    userName: 'William1113',
    caption:
      'I just had a wonderful breakfast at the Resort Today. How does your day look?',
    tags: ['#resortNomad', '#breakfast', '#chirpzMorning'],
  };
  const AddPost = async () => {
    await addPost(post);
  };
  const UpdatePostData = async () => {
    updatePost(update);
  };
  const DeletePost = async () => {
    deletePost('8');
  };
  function handleClick() {
    dispatch(
      postsApi.util.updateQueryData('posts', undefined, draftPosts => {
        draftPosts.body = [update, ...draftPosts.body];
      }),
    );
  }
  function handleClick1(id: string) {
    dispatch(
      postsApi.util.updateQueryData('posts', undefined, draftPosts => {
        const index = draftPosts.body.findIndex(
          (item: {id: string}) => item?.id === id,
        );

        if (index !== -1) {
          draftPosts.body[index].userName = 'William1113789';
          console.log('---', draftPosts.body[index]);
        }
        draftPosts.body;
      }),
    );
  }
  function handleClick2(dataInsert: UpdatePost, index: number) {
    dispatch(
      postsApi.util.updateQueryData('posts', undefined, draftPosts => {
        if (index >= 0 && index <= draftPosts.body.length) {
          draftPosts.body.splice(index, 0, dataInsert);
        }
      }),
    );
  }
  return (
    <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => setShouldFetch(!shouldFetch)}
        style={styles.btn3}>
        <Text style={styles.textButton}>Toggle Fetching</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => AddPost()} style={styles.btn1}>
        <Text style={styles.textButton}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => UpdatePostData()} style={styles.btn2}>
        <Text style={styles.textButton}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => DeletePost()} style={styles.btn3}>
        <Text style={styles.textButton}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleClick()} style={styles.btn2}>
        <Text style={styles.textButton}>Manual Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick1('45555')}
        style={styles.btn2}>
        <Text style={styles.textButton}>Manual Update middle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick2(update, 4)}
        style={styles.btn2}>
        <Text style={styles.textButton}>Manual Update middle</Text>
      </TouchableOpacity>
      {isFetching && <Text>Refresh</Text>}
      {error && <Text>Something went wrong</Text>}
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <FlatList
          data={data?.body}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: any) => (
            <View style={styles.card}>
              <Text> {item.id}</Text>
              <Text> {item.userName}</Text>
              <Text> {item.caption}</Text>
              <Text> {item.isVerified}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: 'green',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btn2: {
    backgroundColor: 'red',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btn3: {
    backgroundColor: 'blue',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 16,
    elevation: 1,
    padding: 10,
  },
  textButton: {
    color: 'white',
  },
});

export default Screen1;
