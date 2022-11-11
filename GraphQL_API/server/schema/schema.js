const graphql = require('graphql');
const lodash = require('lodash');

const TaskType = new graphql.GraphQLObjectType({
	name: 'Task',
	fields: () => ({
		id: {type: graphql.GraphQLString},
		title: {type: graphql.GraphQLString},
		weight: {type: graphql.GraphQLInt},
		description: {type: graphql.GraphQLString}
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
			return lodash.find(tasks, { id: args.id });
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

const schema = new graphql.GraphQLSchema({
	query: RootQuery,
});

module.exports = schema;
