# dataMerge
对大量数据进行合并处理，优化性能。

主旨是对某一时间段里的数据进行合并，重复的记录进行去重，只取最新的记录。比如一秒钟来了1000条数据，其中有500条是重复的，那这一秒钟应该只返回500条结果。
## 两种模式
1. 一种是合并去重模式,把某一时间段内的内容合并后进行去重再返回结果集
2. 只作合并，只对时间段内的内容合并返回结果集