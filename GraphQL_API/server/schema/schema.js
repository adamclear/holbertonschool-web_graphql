const graphql = require('graphql');

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
			}},
		resolve: (parent, args) => {}
	})
});

const schema = new graphql.GraphQLSchema({
	query: RootQuery,
});

module.exports = schema;
