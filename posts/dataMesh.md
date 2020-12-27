# Data Mesh in Practice

*There's an API for that*

I recently read [this article](https://martinfowler.com/articles/data-monolith-to-mesh.html) on Martin Fowler's blog about a cool new paradigm for enterprise data platforms: the *distributed data mesh*. I've seen this now in a few other places ([like here](https://towardsdatascience.com/data-mesh-2-0-daad4f8ec910)) and I'm pretty conflicted on whether or not I think it's too idealistic or a cool solution to a real problem. Here are my ramblings on it:

# The centralized data team

Before we talk about the data mesh, let's make a few assumptions about the world today.

Assume you're the CEO of a big company. You read about fancy new data use cases every day, and after reading about a particularly earth-shattering data-driven breakthrough (maybe [this one](https://www.vox.com/future-perfect/22045713/ai-artificial-intelligence-deepmind-protein-folding)), you finally decide to take that daunting leap of faith: your company is now going to be a *data driven organization*.

You start small. You rustle together a few engineers and set them to work on building a [data lake](https://searchaws.techtarget.com/definition/data-lake#:~:text=A%20data%20lake%20is%20a,flat%20architecture%20to%20store%20data.). You know that every customer who uses your mobile app has to give a shipping address, so you set a goal to make a map of every customer who has ever bought something from your company. Your team of engineers gets to work, and they come back to you a while later with something that resembles this:

![dash](https://systems.jhu.edu/wp-content/uploads/2020/03/nCoV-map-Mar1320-768x385.png)

(*This is [Johns Hopkins COVID-19 dashboard](https://coronavirus.jhu.edu/map.html) (not a sales dashboard), but you get the idea.*)

*We have that much business in China? It really updates in real-time?* The earth stops. The ground shakes. *We're doing it! We're data-driven now!* you think to yourself.

You call a company-wide town hall meeting. You show this dashboard to every one of your 100,000 employees. *This is the way*, you say with a smile. They look up in shock. They have never seen a dashboard before.

Suddenly, data is discovered everywhere. The marketing team realizes that their Facebook advertising campaigns are overflowing with data about customers. The HR team finds an AI bot from a startup that can do performance reviews if trained on employee data. The finance team devises a revolutionary new revenue prediction model, but the company-issued laptops *just can't take* processing the 100,000 rows the model needs to give useful predictions without crashing.

Your team of rustled engineers who put the initial data platform together are now drowning with requests: *Can you load dataset x for me? Can I have access to dataset y? Can I have a cloud server with 128GiB of memory?* Though they appear to be handling all these new requests with aplomb (they are rockstars, after all), they are actually suffering from severe cases of [Stanford Duck Syndrome](https://www.kqed.org/perspectives/201601138907/duck-syndrome#:~:text=At%20Stanford%20the%20term%20%E2%80%9CDuck,image%20of%20relaxed%20California%20chill.&text=Duck%20syndrome%20is%20a%20disease,effortless%20to%20the%20outside%20world.). Being the astute manager you are, you decide to reintroduce some sanity back into their lives by hiring a proper manager, a few more engineers, and a business analyst.

Congratulations, you now have a *centrazlied data team*! This team can now spend all their time and energy making your organization more data driven.

# Some problems with the centralized data team

Your company has followed a logical progression. In the end, we end up with what the Fowler blog folks call a monolithic data platform (I don't totally agree with this name, but whatever) - all data flows through one giant ingestion/transformation pipeline (and team) before becoming available for people to use in their day-to-day. It looks something like this:

![data-platform](https://martinfowler.com/articles/data-monolith-to-mesh/big-data-platform.png)
*(Image taken from [here](https://martinfowler.com/articles/data-monolith-to-mesh.html))*

The Fowler blog folks point out a few problems with this model:

The first problem is that it's hard to consume *all* data and store it in one standardized way that every system can comply with. The whole point of the data platform is to ingest data from a bunch of different sources, which means by definition that data will have different formats, delivery mechanisms, etc..

The second problem is that consumers in this model tend to be pretty tech-savvy (they're data consumers, after all). This means they will move fast - and may change what they want frequently. Having one central team responsible for the data platform makes these demands extremely challenging - since they will be changing constantly and only the centralized data team can make these changes materialize. Achieving ever-changing objectives like this across teams requires a TON of coordination to be done successfully.

The third (and, in my opinion, most significant) problem is how ownership is assigned in this model. I'll quote directly: *I personally don't envy the life of a data platform engineer. They need to consume data from teams who have no incentive in providing meaningful, truthful and correct data. They have very little understanding of the source domains that generate the data and lack the domain expertise in their teams. They need to provide data for a diverse set of needs, operational or analytical, without a clear understanding of the application of the data and access to the consuming domain's experts.* - taken from [here.](https://martinfowler.com/articles/data-monolith-to-mesh.html#SiloedAndHyper-specializedOwnership)

These are all very real problems in an enterprise's data platform. This has led to a clever new paradigm... the *data mesh*!

# The distributed data mesh

There are a few core ideas to the data mesh:
- Domain expertise drives "data products"
- Data infrastructure as a platform
- Open standards to control the chaos

Let's talk about what these mean in practice.

## Domain expertise drives domain products

Rather than have one centralized data team who handles all data ingestion from every data source, the data mesh model suggests **embedding a data-focused engineer and product owner on each domain team with data needs**. In other words, a mini data team (a Data Engineer or two and a Data Product Owner) is assigned to the marketing team. Another is assigned to the finance team. And another to HR.

The job of these mini teams are to create data products for their team specifically. This has the major benefit of allowing the engineers and product owners to build domain expertise while also contributing data-driven solutions (these were two separate jobs in the previous model).

The marketing team wants to run Airflow on Kubernetes and the Finance team wants to run Kafka on AWS MSK? Sure - no problem, each respective data engineer can handle this (using the tools created by the data infrastructure team, we'll talk about that next). The major paradigm shift here is that these choices become implementation details specific to each domain - the decision to use one tool on one team doesn't have any effect on another team (unless that's desired or intentional).

This actually has some huge ancillary benefits. With this model, every component of a data product (tool choice, data processing mechanism, presentation layer, etc.) is controlled **within a single domain**. Keeping these choices within the domain allows them to happen without cross-team dependencies, freeing up both teams to get to work on the important stuff.

Engineers who have worked at large organizations may have a code smell right now: *Do we really want every team using their own isolated tools to build stuff in a vacuum? Won't we just end up with a bunch of fragmented, hidden tools? How do we govern and audit a bunch of things developed on their own?*

Let's talk about how we prevent this from happening.

## Open standards to control the chaos

Having visibility over what tools engineers are using, what data exists in the organization, how data is accessed, and more is an incredibly important piece of any data platform. In fact, one of the reasons to adopt the "monolithic" platform is that you get this centralized governance by definition (since everything goes through one place to access data). Without standards, the domain-first approach above sounds like a compliance nightmare.

That's why a crucial piece of the data mesh paradigm is the concept of open standards. There need to be rules in place to take care of basic needs like monitoring, alerting, auditing, etc., or else it would truly be chaos.

The Fowler blog suggests defining standards around the following (I won't describe them since I think they're pretty self-explanatory):
- Discoverability
- Addressability (how do we uniquely identify them)
- Trustworthiness
- Usability (how self-descriptive it is)
- Interoperability
- Security

With standards in the following areas in place, we can control the chaos. But... how do we enforce these standards? What's to prevent engineers from going rogue and

## Data infrastructure as a platform

I've been hating on the centralized data team too much - we still need a centralized data team is still required with the data mesh model. In fact, it's probably the most critical team in the data mesh model.

A crucial difference, though, in the central data team in this model is that **the centralized data team in the data mesh model focuses on self-service infrastructure and tools as a platform**. This team is not concerned with domain-specific use cases, all they care about putting the tools in the toolbox so everybody can do their own work. This is quite intentional.



This visual does a pretty good job of showing the concept at a high level:

![data-mesh](https://martinfowler.com/articles/data-monolith-to-mesh/data-mesh.png)

# Conclusion

It's interesting. Part of me loves the idea, part of me finds it a bit of a [YAGNI](https://martinfowler.com/bliki/Yagni.html).

moving from the "single data repository" strategy of making data available to "consumers" inside
