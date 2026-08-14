---
title: 从 Seq2Seq 到 Attention
icon: creative
date: 2026-06-19
category: AI
tag:
  - Attention
  - Transformer
---

# 从 Seq2Seq 到 Attention

## 前言

自然语言处理（NLP）或是大语言模型（LLM）的底层原理是 Attention（注意力机制），它不仅是如今如日中天的 Transformer 架构的灵魂核心，更是开启这轮 AI 狂飙时代的超级引擎。

其实，技术的演进从来都不是凭空捏造的。要想真正吃透 Attention，必须先回到大模型爆发的“前夜”，去看看上一代霸主——传统 Seq2Seq 模型到底遇到了什么无法跨越的“致命瓶颈”。

## 什么是 Seq2Seq 模型？

Seq2Seq 是一种常见的 NLP 模型结构，全称是：sequence to sequence，翻译为“序列到序列”。顾名思义：从一个文本序列得到一个新的文本序列。这类任务的特点是：输入序列和输出序列的长度通常是不对等的。

Seq2Seq 模型架构由编码器（Encoder）和解码器（Decoder）两部分组成：
1. 编码器（Encoder）：负责把输入的文本序列（比如“我爱机器学习”）一个个读进去，通过循环神经网络（RNN）不断更新隐状态（hidden state），最终将整句话的语义压缩成一个固定长度的向量。这个向量我们称之为上下文向量（Context Vector）。
2. 解码器（Decoder）：拿到这个 context 向量后，像挤牙膏一样，一步步把目标文本（比如 "I love machine learning"）吐出来。

典型的任务有：机器翻译任务，文本摘要任务。

::: warning 需要注意的是：
1. Seq2Seq 模型中的 Encoder和 Decoder 一般采用的是循环神经网络 RNN（Transformer 模型还没出现的过去时代）。
2. **context 的数组长度是基于 Encoder RNN 的隐藏层神经元数量的**，在实际应用中，context 向量的长度是自定义的，比如可能是 256，512 或者 1024。
::: 

## 基于 RNN 的 Seq2Seq 模型如何处理文本/长文本序列？

可以参考 [jalammar](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-Seq2Seq-models-with-attention/) 制作的动画对 Seq2Seq 处理文本/长文本序列有一个清晰的认识。

<video src="/videos/Seq2seq.mp4" controls width="100%"></video>

我们用数学语言来更精确地还原这个过程。以机器翻译为例，假设序列输入是一个句子，这个句子由$n$个单词组成：$sentence = {w_1, w_2,...,w_n}$

1. **词向量映射**：首先，RNN 将句子中的每一个单词通过一个嵌入层（Word Embedding）映射成为一个向量得到一个向量序列：$X = {x_1, x_2,...,x_n}$。
2. **编码器隐状态更新**：在时间步 $t \in [1, n]$， Encoder RNN 的内部计算公式为： 
$$
h_{t} = \text{RNN}_{enc}(x_t, h_{t-1})
$$
这里，$h_{t-1}$ 是上一个时间步的隐状态，它像一个滚雪球一样，携带了从 $w_1$ 到 $w_{t-1}$ 的全部历史信息。$x_t$ 是 RNN 在时间步$t$的输入单词$w_t$经过映射得到的向量。
3. **传递 context 向量**：当 Encoder 读完最后一个词 $w_n$ 时，它输出的最后一个隐状态 $h_n$ 就成为了代表整句话语义的 context 向量：
$$
\text{context} = h_n
$$
4. **解码器生成序列**：Decoder 接收到 context 后，将其作为初始隐状态 $s_0 = \text{context}$，然后开始逐字预测： 
$$
s_i = \text{RNN}_{dec}(y_{i-1}, s_{i-1})
$$
$$
y_i = \text{softmax}(W_o s_i)
$$
其中 $y_{i-1}$ 是解码器上一步输出的单词，$s_i$ 是解码器当前的隐状态。

## Seq2Seq 模型处理长文本序列时遇到了什么问题？有什么优缺点？

经典 Seq2Seq 看似完美，但在工程实践中却遇到了极大的挑战。它的致命缺点可以总结为一句话：成也 context，败也 context。

打个比方：这就好比让你去读一本 500 页的长篇小说（输入长文本），读完之后不准你翻书，只允许你在脑子里提取出 100 个字 的故事大纲（固定长度的 context 向量）。然后，让你根据这 100 字的大纲，把整本书一字不漏地翻译成英文（解码器输出）。

这显然是不可能的任务！

在实际应用中，这种架构存在两个无法调和的矛盾：

基于 RNN 的 Seq2Seq 模型中 **Encoder 把所有信息都编码到了一个context向量中**，便是这类模型的瓶颈。
1. **信息量与表达能力的矛盾**：单只固定维度的向量（比如维度是 512），其所能容纳的信息熵是极其有限的，很难包含所有文本序列的信息。强行将一段成百上千字的文本压缩进如此小的空间，必然会导致严重的信息丢失。
2. **梯度消失与记忆遗忘**：由于 RNN 是串行递归计算的，即使使用了 LSTM 或 GRU，在处理到第 500 个单词时，很难再包含1-499个单词中的所有信息了。这就是经典的**长距离依赖问题**（Long-range Dependency）。

为了打破这个窒息的信息瓶颈，2014 年， Dzmitry Bahdanau 等人提出了一项开创性的技术——注意力机制（ Attention Mechanism）。

## 基于 RNN 的 Seq2Seq 模型如何结合 Attention 来改善模型效果？

既然问题出在“**试图用一个固定向量代表整句话**”上，那我们索性不再强行压缩！

Attention 的核心思想非常朴素：

1. Encoder 在处理输入时，把所有时间步的隐状态 ${h_1, h_2, ..., h_n}$ 全部保留并发送给 Decoder ，而不仅仅是最后一个隐状态 $h_n$。
2. 当 Decoder 在产生第 $i$ 个输出单词时，它会动态地去计算当前输出状态与输入端所有隐状态的关联度（即注意力分配分数）。
3. 接着，根据这些分数对所有隐状态进行加权求和，融合成一个专属于当前时间步的动态 context 向量 $c_i$。

Attention 机制与经典的 Seq2Seq 模型主要有两点不同：

- 首先，编码器会把更多的数据传递给解码器。编码器把所有时间步的 hidden state（隐藏层状态）传递给解码器，而不是只传递最后一个 hidden state（隐藏层状态）

- 注意力模型的解码器在产生输出之前，做了一个额外的 Attention 处理：

::: warning 注意
今天我们不关注 Attention 内部实现的细节，只是简单了解大致的作用，以及其与 Seq2Seq 的区别。 
:::

<video src="/videos/Mechanics-of-Seq2seq-Models-With-Attention.mp4" controls width="100%"></video>

1. 由于编码器中每个 hidden state（隐藏层状态）都对应到输入句子中一个单词，那么**解码器要查看所有接收到的编码器的 hidden state**（隐藏层状态）。
2. 给每个 hidden state（隐藏层状态）计算出一个分数（我们先忽略这个分数的计算过程）。
3. 所有 hidden state（隐藏层状态）的分数经过softmax进行归一化。
4. 将每个 hidden state（隐藏层状态）乘以所对应的分数，从而能够让高分对应的 hidden state（隐藏层状态）会被放大，而低分对应的 hidden state（隐藏层状态）会被缩小。
5. 将所有hidden state根据对应分数进行加权求和，得到对应时间步的context向量。

::: info 总结
所以，Attention 可以简单理解为：一种有效的加权求和技术，其艺术在于如何获得权重。需要注意的是：注意力模型不是无意识地把输出的第一个单词对应到输入的第一个单词，它是在训练阶段学习到如何对两种语言的单词进行对应。
:::

## 参考

[1] [Visualizing A Neural Machine Translation Model (Mechanics of Seq2Seq Models With Attention)](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-Seq2Seq-models-with-attention/)
[2] [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
