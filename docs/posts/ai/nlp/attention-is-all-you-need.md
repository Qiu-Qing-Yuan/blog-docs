---
title: Attention Is All You Need 论文阅读笔记
date: 2024-12-15 10:00:00
paper:
  title: "Attention Is All You Need"
  authors: "Vaswani, Shazeer, Parmar et al."
  venue: NeurIPS
  year: 2017
  pdf: https://arxiv.org/abs/1706.03762
  code: https://github.com/tensorflow/tensor2tensor
difficulty: 3
rating: 5
category:
  - NLP
tag:
  - Transformer
  - Attention
  - Seq2Seq
  - 深度学习
image: https://cdn.jsdelivr.net/gh/AnyFork/blog-images/markdown/transformer.png
---

&emsp;本文提出了 Transformer 架构，完全基于注意力机制（Attention Mechanism），摒弃了传统的 RNN 和 CNN 结构，在机器翻译任务上取得了当时的最优效果，并成为后续 BERT、GPT 等大模型的基础架构。

<!-- more -->

## 一、论文基本信息

| 项目 | 内容 |
|------|------|
| 论文标题 | Attention Is All You Need |
| 作者 | Ashish Vaswani, Noam Shazeer, Niki Parmar et al. |
| 发表 | NeurIPS 2017 |
| 引用数 | 100,000+ (截至 2024) |

## 二、核心贡献

1. **提出 Transformer 架构**：完全基于 Self-Attention，不需要 RNN/CNN
2. **Multi-Head Attention**：多头注意力机制，让模型同时关注不同位置的不同表示子空间
3. **位置编码（Positional Encoding）**：用正弦/余弦函数编码序列位置信息
4. **并行计算**：相比 RNN 的串行计算，Transformer 可以完全并行，大幅提升训练速度

## 三、模型架构

### 3.1 Encoder-Decoder 结构

- **Encoder**：6 层堆叠，每层包含 Multi-Head Self-Attention + Feed-Forward Network
- **Decoder**：6 层堆叠，每层包含 Masked Multi-Head Self-Attention + Cross-Attention + FFN

### 3.2 Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

关键点：除以 $\sqrt{d_k}$ 是为了防止点积值过大导致 softmax 梯度消失。

### 3.3 Multi-Head Attention

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W^O
$$

其中每个 head 独立做线性变换后计算 Attention，让模型在不同子空间捕获不同类型的依赖关系。

### 3.4 位置编码

使用正弦和余弦函数：

$$
PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d_{model}})
$$
$$
PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d_{model}})
$$

## 四、实验结果

在 WMT 2014 英德翻译任务上：
- BLEU: **28.4**（超越当时所有模型）
- 训练时间：仅 3.5 天（8 GPU）

在 WMT 2014 英法翻译任务上：
- BLEU: **41.0**（单模型最优）

## 五、个人思考

1. **为什么 Transformer 能取代 RNN？** RNN 的串行计算是瓶颈，而 Self-Attention 可以并行处理整个序列，训练效率大幅提升
2. **位置编码的局限性**：正弦位置编码对相对位置的建模能力有限，后续工作（如 RoPE、ALiBi）提出了更好的方案
3. **Self-Attention 的计算复杂度**：$O(n^2)$ 的复杂度对长序列是挑战，后续有 Linformer、Performer 等高效 Attention 方案
4. **这篇论文的历史意义**：不仅在 NLP 领域，Transformer 后续在 CV（ViT）、语音（Whisper）、多模态（CLIP）等领域都取得了巨大成功

## 六、延伸阅读

- BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2019)
- GPT: Improving Language Understanding by Generative Pre-Training (Radford et al., 2018)
- ViT: An Image is Worth 16x16 Words (Dosovitskiy et al., 2020)
