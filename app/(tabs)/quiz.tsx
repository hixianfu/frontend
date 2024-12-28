import ThemedContainer from '@/components/ThemedContainer';
import { useEffect, useState } from 'react';
import Tabs from '@/components/Tabs';
import { Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Swiper from '@/components/Swiper';
import { Course, CourseLevel } from '@/types';
import { fetchCourseList } from '@/apis/course';
import CourseCard from '@/components/CourseCard';
import { router } from 'expo-router';


export default function TabMeScreen() {
  const [images, setImages] = useState([
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287895111-swiper1.jpg',
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287915237-swiper2.jpg',
    'https://xianfu-1321684111.cos.ap-guangzhou.myqcloud.com/image/1735287927105-swiper3.jpg'
  ])
  const [courses, setCourses] = useState<Course[]>([])
  const levels = [{
    label: '全部',
    value: -1
  }, {
    label: '零基础',
    value: CourseLevel.ZERO
  }, {
    label: '初级',
    value: CourseLevel.BEGINNER
  }, {
    label: '中级',
    value: CourseLevel.INTERMEDIATE
  }, {
    label: '高级',
    value: CourseLevel.ADVANCED
  }]
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.ALL)

  const fetchCourses = async (currentLevel: CourseLevel) => {
    const response = await fetchCourseList(currentLevel === CourseLevel.ALL ? undefined : currentLevel)
    setCourses(response)
  }

  const filterCourse = async (level: CourseLevel) => {
    setLevel(level)
    await fetchCourses(level)
  }

  useEffect(() => {
    fetchCourses(level)
  }, [])

  return (
    <ThemedContainer>
      <Swiper images={images} />

      <Tabs tabLabels={['难易度', '类别']}>
        <View>
          <View style={styles.levelButtons}>
            {levels.map((l, index) => (
              <Button style={{ backgroundColor: l.value === level ? '#6851A4' : '#fff' }} mode='outlined' labelStyle={{ paddingLeft: 4, paddingRight: 4, color: l.value === level ? '#fff' : '#6851A4' }} compact key={index} onPress={() => filterCourse(l.value)}>
                {l.label}
              </Button>
            ))}
          </View>
          <ScrollView style={{ height: '70%', width: '100%', marginTop: 8 }}>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
              {courses.map((c, index) => (
                <CourseCard course={c} key={index} onPress={() => router.push(`/quiz-detail?courseId=${c.id}`)} />
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <ScrollView style={{ height: '76%', width: '100%' }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <View style={{ width: '47%', height: 200 }}>
                <Image source={require('@/assets/images/avatar.jpg')} style={{ width: '100%', height: '100%' }} />
              </View>
            </View>
          </ScrollView>
        </View>
      </Tabs>
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  levelButtons: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap'
  },
  quizCards: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16
  }
})