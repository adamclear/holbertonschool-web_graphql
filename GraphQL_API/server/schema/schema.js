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
