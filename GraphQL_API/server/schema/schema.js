const graphql = require('graphql');
const lodash = require('lodash');
const Project = require('../models/project');
const Task = require('../models/task');

const TaskType = new graphql.GraphQLObjectType({
	name: 'Task',
	fields: () => ({
		id: {type: graphql.GraphQLString},
		title: {type: graphql.GraphQLString},
		weight: {type: graphql.GraphQLInt},
		description: {type: graphql.GraphQLString},
		project: {
			type: TaskType,
			resolve: (parent, args) => {
				return lodash.find(projects, {id: parent.projectId});
			}
		}
	})
});

const ProjectType = new graphql.GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: {type: graphql.GraphQLID},
		title: {type: graphql.GraphQLString},
		weight: {type: graphql.GraphQLInt},
		description: {type: graphql.GraphQLString},
		tasks: {
			type: new graphql.GraphQLList(TaskType),
			resolve: (parent, args) => {
				return lodash.filter(tasks, {projectId: parent.id});
			}
		}
	})
});

const RootQuery = new graphql.GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		task: {
			type: TaskType,
			args: {
				id: {type: graphql.GraphQLID}
			},
			resolve: (parent, args) => {
				return lodash.find(tasks, {id: args.id});
			}
		},
		project: {
			type: ProjectType,
			args: {
				id: {type: graphql.GraphQLID}
			},
			resolve: (parent, args) => {
				return lodash.find(projects, {id: args.id});
			}
		},
		tasks: {
			type: new graphql.GraphQLList(TaskType),
			resolve: () => {
				return tasks;
			}
		},
		projects: {
			type: new graphql.GraphQLList(ProjectType),
			resolve: () => {
				return projects;
			}
		}
	}),
});

const Mutation = new graphql.GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addProject: {
			type: ProjectType,
			args: {
				title: {type: new graphql.GraphQLNonNull(GraphQLString)},
				weight: {type: new graphql.GraphQLNonNull(GraphQLInt)},
				description: {type: new graphql.GraphQLNonNull(GraphQLString)}
			},
			resolve: (parent, args) => {
				const newProject = new Project({

				})
			}
		}
	})
});

const tasks = [
	{
    id: '1',
    projectId: '1',
    title: 'Create your first webpage',
    weight: 1,
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Structure your webpage',
    weight: 1,
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
  },
];

const projects = [
  {
    id: '1',
    title: 'Advanced HTML',
    weight: 1,
    description: `Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don't worry, the final page will be “ugly” its normal, it's not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!`
  },
  {
    id: '2',
    title: 'Bootstrap',
    weight: 1,
    description: `Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.`
  },
];

const schema = new graphql.GraphQLSchema({
	query: RootQuery,
});

module.exports = schema;
