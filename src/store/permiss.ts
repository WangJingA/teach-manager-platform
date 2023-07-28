import { defineStore } from 'pinia';

interface ObjectList {
	[key: string]: string[];
}

export const usePermissStore = defineStore('permiss', {
	state: () => {
		const keys = localStorage.getItem('ms_keys');
		return {
			key: keys ? JSON.parse(keys) : <string[]>[],
			defaultList: <ObjectList>{
				admin: [
					'1', '2', '3', '4', '5', '6', '7', '8',
					'9', '10', '11', '12', '13', '14', '15', '16'
					,'teacher-class-student','teacher-class','teacher-course',
					'teacher-course-practice','teacher-course-summary','teacher-exam',
					'teacher-file','teacher-home-page','teacher-video','teacher-class-detail','teacher-create-course','teacher-question'
				],
				user: ['1', '2', '3', '11', '13', '14', '15'],
				teacher:['teacher-class-student','teacher-class','teacher-course',
					'teacher-course-practice','teacher-course-summary','teacher-exam',
					'teacher-file','teacher-home-page','teacher-video','teacher-class-detail','teacher-create-course','teacher-question']
			}
		};
	},
	actions: {
		handleSet(val: string[]) {
			this.key = val;
		}
	}
});
