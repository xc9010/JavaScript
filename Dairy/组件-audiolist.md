
#### AudioList

```
是以前写过的一个功能，实现在列表内播放音频，并且点击其他item播放对应的音频，并关闭之前播放的音频
```





- 1 title截取
    - data入参的时候要考虑title不存在的情况，因为src是必须的，所以可以考虑截取src的name来备用
- 2 考虑能否获取静态资源的size和duration
- 3 keygen的使用
    - 考虑实现内部的一套Keygen，而不是依赖于外部数据传入
- 4 抽取子元素
    - 原子组件单独抽出，提高复用率
- 5 增加更多实例
- 6 audioList的class扩展
- 7 暴露api优化
- 8 audio的唯一ID
    - 实例化利用ref实现，避免了使用上的冲突
- 9 考虑垂直分布样式
- 10 uiText
- 11 class合并
- 12 play 过程注释
- 13 主体结构的优化
- 14 data默认值
